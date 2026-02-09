import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
        };
        createOrder: (data: unknown, actions: {
          order: {
            create: (order: {
              purchase_units: Array<{
                description: string;
                amount: {
                  value: string;
                  currency_code: string;
                };
              }>;
            }) => Promise<string>;
          };
        }) => Promise<string>;
        onApprove: (data: unknown, actions: {
          order: {
            capture: () => Promise<{
              id: string;
              payer: {
                name: { given_name: string; surname: string };
                email_address: string;
              };
            }>;
          };
        }) => Promise<void>;
      }) => {
        render: (selector: string) => void;
      };
    };
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t } = useLanguage();
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [paypalRendered, setPaypalRendered] = useState(false);

  useEffect(() => {
    if (isOpen && !paypalRendered && window.paypal && paypalContainerRef.current) {
      // Clear container
      paypalContainerRef.current.innerHTML = '';

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: function(_data, actions) {
          return actions.order.create({
            purchase_units: [{
              description: 'Offre Marrakech 6 Nuits (Voucher)',
              amount: {
                value: '589.00',
                currency_code: 'EUR'
              }
            }]
          });
        },
        onApprove: function(_data, actions) {
          return actions.order.capture().then(function(details) {
            console.log('Paiement réussi via PayPal:', details);
            alert('Transaction validée ! Merci ' + details.payer.name.given_name);
            onClose();
          });
        }
      }).render('#paypal-button-container');

      setPaypalRendered(true);
    }
  }, [isOpen, paypalRendered, onClose]);

  // Reset PayPal when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPaypalRendered(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="font-serif text-2xl text-dark font-bold">{t('finalize_booking')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-dark transition">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        {/* PayPal Widget */}
        <div className="mb-2">
          <p className="text-sm text-gray-500 mb-2 font-bold text-center">{t('pay_deposit')}</p>
          <div 
            id="paypal-button-container" 
            ref={paypalContainerRef}
            className="min-h-[150px] flex items-center justify-center bg-gray-50 rounded-xl"
          >
            <span className="text-gray-400 text-sm animate-pulse">{t('payment_loading')}</span>
          </div>
        </div>
         
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            <i className="fa-solid fa-lock mr-1"></i> {t('payment_secure')}
          </p>
        </div>
      </div>
    </div>
  );
}
