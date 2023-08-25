export default class appLog {
    static MsgPrefix(type, msg){
        const now_t = new Date();
        const tmStamp = `${now_t.getFullYear()}/${now_t.getMonth() + 1}/${now_t.getDay()} ${now_t.getHours()}:${now_t.getMinutes()}:${now_t.getSeconds()} +${now_t.getMilliseconds()}`;
        return `[${tmStamp}] [${type}] ${msg}`;
    }

    static info(msg){
        console.info(this.MsgPrefix("INFO", msg));
    }

    static success(msg){
        console.log(this.MsgPrefix("SUCCESS", msg));
    }

    static warning(msg){
        console.warn(this.MsgPrefix("WARNING", msg));
    }

    static error(msg){
        console.error(this.MsgPrefix("ERROR", msg));
    }
}