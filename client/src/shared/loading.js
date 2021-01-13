
import { h, createElement  } from 'preact';

export function PopupLoading({ text = 'Đang xử lý...' }) {
    return <div>
        <lottie-player
            autoplay
            loop
            mode="normal"
            src={`${HOST}/json/loading.json`}
            style="width: 5em; margin: 0 auto;"
        >
        </lottie-player>
        <p style="font-size: 13px; margin: 2px 0 16px;">{text}</p>
    </div>
}