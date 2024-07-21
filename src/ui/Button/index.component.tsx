import "./index.scss";

type ButtonProps = {
	/**
	 * The variant of the main button design.
	 */
	readonly variant: "primary" | "secondary" | "destructive";

	/**
	 * If you want to add a custom className to the button.
	 */
	readonly className?: string;

	/**
	 * Control if the button is disabled.
	 */
	readonly disabled?: boolean;

	/**
	 * If you want to add custom style to the button
	 */
	readonly style?: React.CSSProperties;

	/**
	 * If you want to change the type of the button. Default type is button.
	 */
	readonly type?: "button" | "reset" | "submit";

	/**
	 * The callback function called when button is clicked.
	 * The `onClick` function is an event handler attached to the button just like a normal HTML
	 * `<button>`.
	 */
	readonly onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * The content inside the button.
	 */
	readonly children: React.ReactNode;
};

export function Button({
	children,
	className,
	disabled = false,
	style,
	type = "button",
	variant,
	onClick,
}: ButtonProps): JSX.Element {
	return (
		<button
			className={`button ${variant}
				type={type}
				${className ?? ""}`.trim()}
			disabled={disabled}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
