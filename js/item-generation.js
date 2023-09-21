const form = document.getElementById('form');
const newVariableForm = document.getElementById('new-variable-form');
const newVariableNameField = document.getElementById('new-variable-name');
const newVariableTypeField = document.getElementById('var-type');
const nameField = document.getElementById('item-name');
const descriptionField = document.getElementById('item-description');
const modelField = document.getElementById('item-model');
const categoryField = document.getElementById('item-category');
const healthField = document.getElementById('item-health');
const newVariableBtn = document.getElementById('new-variable-btn');
const submitBtn = document.getElementById('submit-btn');
const varContainer = document.getElementById('input-container');


const debugPreview = document.getElementById('debug-preview');


let customVariables = [];

function addCustomVariables() {
	variableNames = customVariables.map((variable) => {
		let varType = variable.type;
		let val = document.getElementById(`item-${variable.name}`).value;
		if (varType === "string") {
			val = `"${val}"`;
		} 
		else if (varType === "bool") {
			val = document.getElementById(`item-${variable.name}`).checked ? "true" : "false";
		}
		return `ITEM.${variable.name} = ${val}`;
	});
	console.log(variableNames)
	return variableNames;
}


function generateLua(itemName, itemDesc, itemModel, itemCategory, itemHealth, itemID) {
  let lua = `ITEM.name = ${itemName}
  ITEM.model = ${itemModel}
  ITEM.description = ${itemDesc}
	ITEM.category = ${itemCategory}
	ITEM.health = ${itemHealth}
	${addCustomVariables().map((variable) => {
		console.log(variable);
		return variable;
	}).join('\n')};

	function ITEM:GetDescription()
	<lua_tab>return self.description
	end

	ITEM.functions.Use = {
	<lua_tab>OnRun = function(item)
	<lua_tab><lua_tab>local client = item.player
	<lua_tab><lua_tab>client:SetHealth(client:Health() + item.health)
	<lua_tab><lua_tab>client:ChatPrint("You feel refreshed!")
	<lua_tab><lua_tab>return true
	<lua_tab>end
	}
  `;

  lua = lua.replace(/^[ \t]+/gm, '');
  previewFile(lua);
  //generateFile(itemID, lua);
}

function previewFile(data) {
  formattedData = data
    .replace(/\n/g, '<br />')
    .replace(/<lua_tab>/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  debugPreview.innerHTML = formattedData;
}

function generateFile(itemID, data) {
  data = data.replace(/<lua_tab>/g, '\t');
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `sh_${itemID}.lua`;
  a.click();
  URL.revokeObjectURL(url);
}

function createItemVariable(varName) {
	const newVariable = {
		name: varName,
		type: newVariableTypeField.value,
	};
	return newVariable;
}

function displayItemVariable(customVariable) {
	const label = document.createElement('label');
	const input = document.createElement('input');
	label.innerHTML = customVariable.name;
	input.id = `item-${customVariable.name}`;
	if (customVariable.type == "bool") {
		input.type = "checkbox";
	} else if (customVariable.type == "number") {
		input.type = "number";
	} else {
		input.type = "text";
	}
	varContainer.appendChild(label);
	varContainer.appendChild(input);
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
})

newVariableForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const newVariable = createItemVariable(newVariableNameField.value);
	customVariables.push(newVariable);
	displayItemVariable(newVariable);
})


submitBtn.addEventListener('click', (e) => {
  const name = nameField.value;
  const desc = descriptionField.value;
  const model = modelField.value;
	const category = categoryField.value;
	const health = healthField.value;
  generateLua(name, desc, model, category, health, 'test_item');
});
