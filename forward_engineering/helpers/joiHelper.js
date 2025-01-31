const { factory, NodeFlags } = require('typescript');

function generateObjectProperty(propList) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(
			factory.createCallExpression(
				factory.createPropertyAccessExpression(
					factory.createIdentifier('Joi'),
					factory.createIdentifier('object'),
				),
				undefined,
				[],
			),
			factory.createIdentifier('keys'),
		),
		undefined,
		[factory.createObjectLiteral(propList, true)],
	);
}

function generateDateProperty() {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier('Joi'), factory.createIdentifier('date')),
		undefined,
		[],
	);
}

function generateBoolProperty() {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier('Joi'), factory.createIdentifier('bool')),
		undefined,
		[],
	);
}

function generateStringProperty() {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier('Joi'), factory.createIdentifier('string')),
		undefined,
		[],
	);
}

function generateNumberProperty() {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier('Joi'), factory.createIdentifier('number')),
		undefined,
		[],
	);
}

function generateNullProperty() {
	let valueExpression = factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier('Joi'), factory.createIdentifier('valid')),
		undefined,
		[factory.createNull()],
	);

	valueExpression = required(valueExpression);

	return valueExpression;
}

function generateArrayProperty(propList) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(
			factory.createCallExpression(
				factory.createPropertyAccessExpression(
					factory.createIdentifier('Joi'),
					factory.createIdentifier('array'),
				),
				undefined,
				[],
			),
			factory.createIdentifier('items'),
		),
		undefined,
		propList,
	);
}

//wrap required
function required(expression) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('required')),
		undefined,
		[],
	);
}

function optional(expression) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('optional')),
		undefined,
		[],
	);
}

function allowNull(expression) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('allow')),
		undefined,
		[factory.createNull()],
	);
}

function stringMinLength(expression, minLength) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('min')),
		undefined,
		[factory.createNumericLiteral(minLength.toString())],
	);
}

function stringMaxLength(expression, maxLength) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('max')),
		undefined,
		[factory.createNumericLiteral(maxLength.toString())],
	);
}

function stringLength(expression, length) {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(expression, factory.createIdentifier('length')),
		undefined,
		[factory.createNumericLiteral(length.toString())],
	);
}

function generateExpression(value, modelDefinitions) {
	let expression, type;

	// if its a reference type
	if (value['$ref']) {
		let model = value['$ref'].replace('#model/definitions/', '');
		let modelValue = modelDefinitions.properties[model];
		return generateExpression(modelValue, modelDefinitions);
	}

	//multi type
	if (value.type instanceof Array && value.type.length > 0) {
		type = value.type[0];
	} else {
		type = value.type;
	}

	if (type === 'string') {
		expression = generateStringProperty();
		if (value.length) {
			expression = stringLength(expression, value.length);
		}
		if (value.minLength) {
			expression = stringMinLength(expression, value.minLength);
		}
		if (value.maxLength) {
			expression = stringMaxLength(expression, value.maxLength);
		}
	} else if (type === 'numeric' || type === 'number') {
		expression = generateNumberProperty();
	} else if (type === 'bool' || type === 'boolean') {
		expression = generateBoolProperty();
	} else if (type === 'date') {
		expression = generateDateProperty();
	} else if (type === 'object' || type === 'document') {
		expression = generateObjectProperty(generateJoiTypes(value, modelDefinitions));
	} else if (type === 'array') {
		expression = generateArrayProperty(generateJoiTypes(value, modelDefinitions));
	} else if (type === 'null') {
		expression = generateNullProperty();
	}

	if (value.optional) {
		expression = optional(allowNull(expression));
	}

	return expression;
}

function generateJoiTypes(jsonSchema, modelDefinitions) {
	const propList = [];

	//this is needed because the json structure changes when
	//1 item is only in the array (it becomes just an object)
	let itemsArray = [];
	if (jsonSchema.items) {
		itemsArray = jsonSchema.items instanceof Array ? jsonSchema.items : [jsonSchema.items];
	}
	// if array
	for (const index in itemsArray) {
		const value = itemsArray[index];

		let expression = generateExpression(value, modelDefinitions);

		//check for required is set to true
		if (jsonSchema.required) {
			const list = jsonSchema.required;
			if (list.includes(index)) {
				expression = required(expression);
			}
		}

		propList.push(expression);
	}

	// if object
	for (const key in jsonSchema.properties) {
		let value = jsonSchema.properties[key];

		let expression = generateExpression(value, modelDefinitions);
		//check for required is set to true
		if (jsonSchema.required) {
			let list = jsonSchema.required;
			if (list.includes(key)) {
				expression = required(expression);
			}
		}

		propList.push(factory.createPropertyAssignment(factory.createIdentifier(key), expression));
	}

	return propList;
}

const generateJoiObjects = (jsonSchema, modelDefinitions) => {
	const propList = generateJoiTypes(jsonSchema, modelDefinitions);

	//loop and add all props
	return factory.createVariableStatement(
		undefined,
		factory.createVariableDeclarationList(
			[
				factory.createVariableDeclaration(
					factory.createIdentifier('schema'),
					undefined,
					factory.createCallExpression(
						factory.createPropertyAccessExpression(
							factory.createCallExpression(
								factory.createPropertyAccessExpression(
									factory.createIdentifier('Joi'),
									factory.createIdentifier('object'),
								),
								undefined,
								[],
							),
							factory.createIdentifier('keys'),
						),
						undefined,
						[factory.createObjectLiteralExpression(propList, true)],
					),
				),
			],
			NodeFlags.Const,
		),
	);
};

module.exports = {
	generateJoiObjects,
};
