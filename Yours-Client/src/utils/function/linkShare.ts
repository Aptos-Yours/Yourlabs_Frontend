import { setShowAlertInfo } from "./showAlert";

export const copyToClipboard = (link:string, text?:string) => {
    if (navigator.share) {
        // 공유 API 사용 가능할 때
        navigator.share({
          title: 'Yours',
          text: `${text} ${link}`,
        //   url: link
        }).then(() => {
            // share 성공
        })
        .catch(console.error);
      } else {
        // 공유 API 사용 불가능할 때
        navigator.clipboard.writeText(link);
        setShowAlertInfo('링크가 복사되었습니다.', true);
    }
}