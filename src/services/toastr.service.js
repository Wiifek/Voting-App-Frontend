
import container from "../index"
const showSuccessMessage = (message, title) => {
    console.log(container)
    container.success(message, title, {
        closeButton: false,
        showAnimation: "animated slideInRight",
        hideAnimation: "animated slideOutRight",
        timeOut: 1000,
        extendedTimeOut: 3000,
        onClick: () => {
            console.log("clicked")
            container.clear()
        }
    })
}

const showErrorMessage = (message, title) => {
    container.error(message, title, {
        closeButton: false,
        showAnimation: "animated slideInRight",
        hideAnimation: "animated slideOutRight",
        timeOut: 1000,
        extendedTimeOut: 3000,
        onClick: () => {
            console.log("clicked")
            container.clear()
            
        }
    });
}

export default { showSuccessMessage, showErrorMessage }