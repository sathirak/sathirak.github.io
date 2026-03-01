import type { AnchorHTMLAttributes } from "react";

export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a
		className="text-brand-primary hover:text-brand-secondary visited:text-brand-tertiary underline transition-colors"
		target={props.href?.startsWith("http") ? "_blank" : undefined}
		rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
    />
);
