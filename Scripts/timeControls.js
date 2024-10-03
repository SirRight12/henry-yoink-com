try {

    let hTime = hTimeControls()
    let time = timeControls()
    let current = 1
    function changeTimeControl(element) {
        if (element.value == "Classic") {
            current = 1
        } else if (element.value == "Milliseconds") {
            current = 2
        } else {
            element.value = "Classic"
            current = 1
        }
    }
    function useTimeControl(controller) {
        try {
    
        if (controller == 1) {
            hTime()
        } else if (controller == 2) {
            time()
        } else {
            hTime()
        }
        } catch (err) {
            con.innerHTML = err
        }
    }
    function timer() {
        useTimeControl(current)
        // con.innerHTML = "hi "
        requestAnimationFrame(timer)
    }
    timer()
    } catch (err) {
        con.innerHTML = err
    }
    