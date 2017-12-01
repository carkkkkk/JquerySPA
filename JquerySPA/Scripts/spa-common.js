'use strict'
$(document).ready(function () {
    
    var content = $("[data-page-start]")[0].nodeName
    var start = $(content).data('page-start')
    window.location.hash = undefined
    window.location.replace(window.location.origin + window.location.pathname + start)

    window.onhashchange = function () {
        if (window.location.hash) {
            spaController.changePage("contentarea", window.location.hash)
        }
    }
})

var spaController = (function () {

    function loadPage(contentArea, pageName) {
        $.ajax({
            url: pageName + ".html",
            dataType: "html",
            success: function (html) {
                $(contentArea).html(html)
            },
            error: function (error) {
                console.log(error)
            }
        })
    }

    function changePage(contentArea, hashValue) {
        
        var path = $("a[href='" + hashValue + "']").data("page-path") || "";
        var pageName = hashValue.substr(1)

        loadPage(contentArea, path + pageName)

        window.document.title = $("a[href='" + hashValue + "']").attr("title")

        resetMenu(hashValue)
    }

    function resetMenu(hashValue) {
        $("a[href='" + hashValue + "']").focus()
        $("a[href='" + hashValue + "']").css("outline", "0")
    }

    return {
        changePage: function (contentArea, pageName) {
            changePage(contentArea, pageName)
        }
    }
})()