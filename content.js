function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
}

function getWhenExists(selector) {
    return new Promise(resolve => {
        const checkExists = setInterval(() => {
            if($(selector).length) {
                clearInterval(checkExists);
                resolve($(selector)[0]);
            }
        }, 100);
    });
}


$(async () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type == 'attributes' ||
                $(video).attr('src').includes('/settings/viewer/uniplayer/')) {
                video.currentTime = video.duration;
            }
        });
    });

    const video = await getWhenExists('video.vc-vplay-video1');
    const config = { attributes: true };
    observer.observe(video, config);
})