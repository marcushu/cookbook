const showUploadWidget = (uploadCallback) => {
    // eslint-disable-next-line no-undef
    cloudinary.openUploadWidget({
        cloudName: "mhcloudly",
        uploadPreset: "recipePreset",
        sources: [
            "local",
            "camera",
            "google_drive",
            "facebook",
            "dropbox",
            "instagram"
        ],
        googleApiKey: "932336236187626",
        multiple: false,
        defaultSource: "local",
        showInsecurePreview: true,
        cropping: true,
        styles: {
            palette: {
                window: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0078FF",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#0078FF",
                action: "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1"
            },
            fonts: {
                default: {
                    active: true
                }
            }
        }
    },
    (err, result) => uploadCallback(err, result));
}

export { showUploadWidget }