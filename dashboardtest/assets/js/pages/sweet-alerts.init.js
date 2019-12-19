! function(t) {
    "use strict";
    var e = function() {};
    e.prototype.init = function() {
        t("#sa-basic").on("click", function() {
            Swal.fire({
                title: "Any fool can use a computer!",
                confirmButtonColor: "#348cd4"
            })
        }), t("#sa-title").click(function() {
            Swal.fire({
                title: "The Internet?",
                text: "That thing is still around?",
                type: "question",
                confirmButtonColor: "#348cd4"
            })
        }), t("#sa-success").click(function() {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",
                confirmButtonColor: "#348cd4"
            })
        }), t("#sa-error").click(function() {
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#348cd4",
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }), t("#sa-long-content").click(function() {
            Swal.fire({
                imageUrl: "https://placeholder.pics/svg/300x1500",
                imageHeight: 1500,
                imageAlt: "A tall image",
                confirmButtonColor: "#348cd4"
            })
        }), t("#sa-custom-position").click(function() {
            Swal.fire({
                position: "top-end",
                type: "success",
                title: "Your work has been saved",
                showConfirmButton: !1,
                timer: 1500
            })
        }), t("#sa-warning").click(function() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#348cd4",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Yes, delete it!"
            }).then(function(t) {
                t.value && Swal.fire("Deleted!", "Your file has been deleted.", "success")
            })
        }), t("#sa-params").click(function() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                confirmButtonClass: "btn btn-success mt-2",
                cancelButtonClass: "btn btn-danger ml-2 mt-2",
                buttonsStyling: !1
            }).then(function(t) {
                t.value ? Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    type: "success"
                }) : t.dismiss === Swal.DismissReason.cancel && Swal.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    type: "error"
                })
            })
        }), t("#sa-image").click(function() {
            Swal.fire({
                title: "Codefox",
                text: "Responsive Bootstrap 4 Admin Dashboard",
                imageUrl: "assets/images/logo-sm.png",
                imageHeight: 50,
                animation: !1,
                confirmButtonColor: "#348cd4"
            })
        }), t("#sa-close").click(function() {
            var t;
            Swal.fire({
                title: "Auto close alert!",
                html: "I will close in <strong></strong> seconds.",
                timer: 2e3,
                onBeforeOpen: function() {
                    Swal.showLoading(), t = setInterval(function() {
                        Swal.getContent().querySelector("strong").textContent = Swal.getTimerLeft()
                    }, 100)
                },
                onClose: function() {
                    clearInterval(t)
                }
            }).then(function(t) {
                t.dismiss === Swal.DismissReason.timer && console.log("I was closed by the timer")
            })
        }), t("#custom-html-alert").click(function() {
            Swal.fire({
                title: "<i>HTML</i> <u>example</u>",
                type: "info",
                html: 'You can use <b>bold text</b>, <a href="//coderthemes.com/">links</a> and other HTML tags',
                showCloseButton: !0,
                showCancelButton: !0,
                confirmButtonColor: "#348cd4",
                cancelButtonColor: "#f1556c",
                confirmButtonText: '<i class="mdi mdi-thumb-up-outline"></i> Great!',
                cancelButtonText: '<i class="mdi mdi-thumb-down-outline"></i>'
            })
        }), t("#custom-padding-width-alert").click(function() {
            Swal.fire({
                title: "Custom width, padding, background.",
                width: 600,
                padding: 100,
                confirmButtonColor: "#348cd4",
                background: "#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)"
            })
        }), t("#ajax-alert").click(function() {
            Swal.fire({
                title: "Submit your Github username",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: !0,
                confirmButtonText: "Look up",
                confirmButtonColor: "#348cd4",
                cancelButtonColor: "#6c757d",
                showLoaderOnConfirm: !0,
                preConfirm: function(t) {
                    return fetch("//api.github.com/users/" + t).then(function(t) {
                        if (!t.ok) throw new Error(t.statusText);
                        return t.json()
                    }).catch(function(t) {
                        Swal.showValidationMessage("Request failed: " + t)
                    })
                },
                allowOutsideClick: function() {
                    Swal.isLoading()
                }
            }).then(function(t) {
                t.value && Swal.fire({
                    title: t.value.login + "'s avatar",
                    imageUrl: t.value.avatar_url
                })
            })
        }), t("#chaining-alert").click(function() {
            Swal.mixin({
                input: "text",
                confirmButtonText: "Next &rarr;",
                showCancelButton: !0,
                confirmButtonColor: "#348cd4",
                cancelButtonColor: "#6c757d",
                progressSteps: ["1", "2", "3"]
            }).queue([{
                title: "Question 1",
                text: "Chaining swal2 modals is easy"
            }, "Question 2", "Question 3"]).then(function(t) {
                t.value && Swal.fire({
                    title: "All done!",
                    html: "Your answers: <pre><code>" + JSON.stringify(t.value) + "</code></pre>",
                    confirmButtonText: "Lovely!"
                })
            })
        }), t("#dynamic-alert").click(function() {
            swal.queue([{
                title: "Your public IP",
                confirmButtonText: "Show my public IP",
                confirmButtonColor: "#348cd4",
                text: "Your public IP will be received via AJAX request",
                showLoaderOnConfirm: !0,
                preConfirm: function() {
                    return new Promise(function(e) {
                        t.get("https://api.ipify.org?format=json").done(function(t) {
                            swal.insertQueueStep(t.ip), e()
                        })
                    })
                }
            }])
        })
    }, t.SweetAlert = new e, t.SweetAlert.Constructor = e
}(window.jQuery),
function(t) {
    "use strict";
    window.jQuery.SweetAlert.init()
}();
