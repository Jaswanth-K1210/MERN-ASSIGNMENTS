function validateTitle(title) {
    return title.length < 3 ? false : true;   
}

function validatePriority(priority) {
    const priorities = ['low', 'medium', 'high'];
    return priorities.includes(priority.toLowerCase()) ? true : false;
}

function validateDueDate(dueDate) {
    return new Date(dueDate) > new Date() ? true : false;
}

export default { validateTitle, validatePriority, validateDueDate};