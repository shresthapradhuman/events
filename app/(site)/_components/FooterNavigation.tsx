import Link from "next/link";
import React from "react";

const FooterNavigation = ({
  label,
  items,
}: {
  label: string;
  items: {
    label: string;
    url: string;
  }[];
}) => {
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">{label}</h3>
      <div className="flex flex-col space-y-3 text-base">
        {items.map(({ label, url }, key) => (
          <Link key={key} href={url} className="text-muted-foreground hover:text-foreground">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterNavigation;
