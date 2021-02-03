function fillTemplate(templateString, templateVariables) {
    return templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);
}

module.exports = {
    fillTemplate,
};
