function renderLoading(isLoading, button) {
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = button.value
    }
}
export{renderLoading};