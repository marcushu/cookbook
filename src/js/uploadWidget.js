const ggleApiKey = process.env.REACT_APP_GOOGLE_API_KEY

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
        googleApiKey: ggleApiKey,
        multiple: false,
        defaultSource: "local",
        showInsecurePreview: true,
        cropping: false,
        styles: {
            palette: {
                window: "#3fa8b5",
                windowBorder: "#90A0B3",
                tabIcon: "white",
                menuIcons: "white",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#f50057",
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