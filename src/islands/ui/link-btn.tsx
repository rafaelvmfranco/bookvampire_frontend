import type { VariantProps } from "class-variance-authority";

import { cn } from "~/core/utils";
import { buttonVariants } from "~/islands/ui/button";
import { Link as BaseLink } from "~/navigation";

// Extending the types of the Link component to include variant
type ExtendedLinkProps = VariantProps<typeof buttonVariants> &
	React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExtendedLink: React.FC<ExtendedLinkProps> = ({
	className,
	variant,
	size,
	href,
	...props
}) => {
	// Get the classes for the variant
	const variantClasses = buttonVariants({ variant, size });

	// Provide a default href if undefined
	const linkHref = href ?? "/";

	// Return the customized Link component
	// with the additional classes applied
	return (
		<BaseLink
			{...props}
			href={linkHref}
			className={cn(variantClasses, className)}
		/>
	);
};

export { ExtendedLink as LinkBtn };
