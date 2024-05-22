"use client";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <section >
      <header>{children}</header>
      {showSocial && (
        <div>
          <Social />
        </div>
      )}
      <div>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </div>
    </section>
  );
};
