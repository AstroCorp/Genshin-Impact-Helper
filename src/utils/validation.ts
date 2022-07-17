const min = (value: string, minValue: number) => {
	const valueNumber = parseFloat(value);
	return !isNaN(valueNumber) && valueNumber >= minValue;
};

const max = (value: string, maxValue: number) => {
	const valueNumber = parseFloat(value);
	return !isNaN(valueNumber) && valueNumber < maxValue;
};

const required = (value: string) => {
	return value.trim().length > 0;
};

const rules: { [index: string]: Function } = {
	min,
	max,
	required,
};

export type FormData = {
	[index: string]: { value: any; rules: { [index: string]: number | string | boolean }[] };
};

const validateForm = (formData: FormData) => {
	const check: { [index: string]: string[] } = {};

	Object.values(formData).forEach((input, key) => {
		const inputName = Object.keys(formData)[key];
		const inputValues = Array.isArray(input.value) ? input.value : [input.value];
		const inputRules = input.rules;

		inputRules.forEach((rule: { [index: string]: number | string | boolean }) => {
			const ruleName = Object.keys(rule)[0];
			const ruleValue = Object.values(rule)[0];
			let error = false;

			inputValues.forEach(inputValue => {
				const tempErrorStatus = !rules[ruleName](inputValue, ruleValue);

				if (tempErrorStatus) {
					error = tempErrorStatus;
				}
			});

			if (error && check[inputName] === undefined) {
				check[inputName] = [];
			}

			if (error) {
				check[inputName].push(ruleName);
			}
		});
	});

	return check;
};

export default validateForm;
