// $(document).ready(function () {
//     function modifyDOM() {
    //     if ($('#darkMode').checked) {
    //         document.body.style.backgroundColor = "red";
    //     } else {
    //         document.body.style.backgroundColor = "green";
    //     }
    // }

    // $('#darkMode').click(function () {
    //     chrome.tabs.executeScript({
    //         code: 'Cookies.set("Dark-Mode-for-Liverpool-FC-News", "Enabled")'
    //     });
    // });
// });

$(document).ready(function () {
    // console.log("ready to go la")
    // Cookies.set('TESTTTT', 'VALUEEEEE')

    $('#darkMode').click(function () {
        if ($(this).is(':checked')) {
            document.body.style.backgroundColor = "red";
        } else {
            document.body.style.backgroundColor = "green";
        }

        // chrome.tabs.executeScript({
        //     code: 'Cookies.set("Dark-Mode-for-Liverpool-FC-News", "Enabled")'
        // });
    });
});