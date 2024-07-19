"use client";

import "./index.scss";
import type { ChangeEvent, ReactNode } from "react";

type InputProps = {
	readonly label: string;
	readonly name: string;
	readonly value: string | null;
	readonly placeholder: string;
	readonly disabled?: boolean;
	readonly icon?: ReactNode;
	readonly type?: string;
	readonly tips?: string;
	readonly error?: string;
	readonly required?: boolean;
	readonly className?: string;
	readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	readonly onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
	label,
	name,
	value,
	placeholder,
	className,
	disabled = false,
	required = false,
	type = "text",
	tips,
	error,
	icon,
	onChange,
	onBlur,
	...props
}: InputProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (onChange) onChange(event);
	};

	const handleBlur = (event: ChangeEvent<HTMLInputElement>): void => {
		if (onBlur) {
			onBlur(event);
		}
	};

	return (
		<div
			className={
				!error
					? `input ${className ?? ""}`.trim()
					: `input input-error ${className ?? ""}`.trim()
			}
			{...props}
		>
			<label>
				<span>{label}</span>
				<div>
					{icon && <div className="input-icon">{icon}</div>}
					<input
						required={required}
						name={name}
						type={type}
						value={value ?? ""}
						placeholder={placeholder}
						onChange={handleChange}
						onBlur={handleBlur}
						style={{ paddingLeft: icon ? "35px" : "12px" }}
						disabled={disabled}
					/>
				</div>
			</label>

			{error ? (
				<p className="input-error-sentence">{error}</p>
			) : (
				<>{tips && <p className="input-tips">{tips}</p>}</>
			)}
		</div>
	);
}
