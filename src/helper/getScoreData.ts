

const getScoreData = async () => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxm1wcpNCgnVgZF-PvppnNvRwHyDu1apRCKBeUtG3decpidDqn6cjz421TvjlCAS5Cn/exec", {
            method: 'POST',
            headers: {
            'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ key: "value" }), // 必要なデータをJSON形式で送る
        });

        // レスポンスをJSON形式で取得
        const data = await response.json();
        return data;
        
    } catch (error) {
        return false; // エラーが発生した場合はfalseを返す
    }
};

export default getScoreData;