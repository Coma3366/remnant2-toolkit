import { LandingPageCard } from '@/app/_components/landing-page-card';
import { LandingPageContainer } from '@/app/_components/landing-page-container';
import { NAV_ITEMS } from '@/app/_constants/nav-items';

export default async function Page() {
  return (
    <LandingPageContainer
      title="Support the Toolkit"
      description={
        <div className="mt-6 text-lg leading-8 text-gray-300">
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {NAV_ITEMS.supportR2TK.description}
          </p>
        </div>
      }
    >
      <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        <LandingPageCard
          label="Patreon"
          description="Support the Toolkit with a subscription on Patreon."
          href="https://www.patreon.com/JoshPayette/membership"
          target="_blank"
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          label="Ko-Fi"
          description="Make a donation to support the Toolkit on Ko-Fi."
          href="https://ko-fi.com/remnant2toolkit"
          target="_blank"
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          label="PayPal"
          description="Making a donation to the Toolkit on PayPal"
          href="https://www.paypal.com/donate/?hosted_button_id=YGFSAQRH3CZGN"
          target="_blank"
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />
      </div>
    </LandingPageContainer>
  );
}
