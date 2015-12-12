function showToast (research) {
    if(typeof Windows !== undefined) {
        var notifications = Windows.UI.Notifications;
        var template = notifications.ToastTemplateType.toastImageAndText01;
        var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);
        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].appendChild(toastXml.createTextNode(research + " finished! " + (new Date())));

        var toastImageElements = toastXml.getElementsByTagName("image");
        toastImageElements[0].setAttribute("src", "zg.jpg");
        toastImageElements[0].setAttribute("alt", "red graphic");

        var toast = new notifications.ToastNotification(toastXml);
        var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    }
}
