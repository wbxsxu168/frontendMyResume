//Resume2ReactPage
export const Resume2ReactPage = async (req, resp) => {
    try {
		// Sun Xu add it for Node.js/Express.js based Resume2React logic :
		//---------------var set --------------------------------
		var base_path = "http://localhost:8080/";    // common/static-resource accessing endpoint
		const isDebug = true;
		if ( !isDebug ) {
			base_path = "___Prod_backend_URL_here___";
		}
		const bkendServiceURL = base_path;
		const prefx_imgauthurl_path = base_path + "media/docs";
		const prefx_secimgurl_path = prefx_imgauthurl_path + "/secimg";

		const prefx_imgurl_path = base_path + "static/sklseticons_r3y19rvGh";
		const prefx_public_path = base_path + "static/public_tFy5V1E0Kn";

		const tou_doc_Lnk = prefx_public_path + "/termofuse.html";
		const ppolicy_doc_Lnk = prefx_public_path + "/ppolicy.html";

		const pub_resume_ico = prefx_public_path + "/pub_resume_icon.png";
		const csc_greenbelt = prefx_imgurl_path + "/csc_greenbelt.png";
		const python = prefx_imgurl_path + "/python.png";
		const django = prefx_imgurl_path + "/django.png";
		const django_restfrmwrk = prefx_imgurl_path + "/django-restfrmwrk.png";
		const opencv = prefx_imgurl_path + "/opencv-ico.png";
		const bootstrap_logo = prefx_imgurl_path + "/bootstrap-logo.png";
		const tcp_ico = prefx_imgurl_path + "/tcp_ico.png";
		const c_logo = prefx_imgurl_path + "/c-logo.png";
		const jira_icon = prefx_imgurl_path + "/jira-icon.png";
		const wireshark_ico = prefx_imgurl_path + "/wireshark_ico.png";
		const CPP_ico = prefx_imgurl_path + "/CPP_ico.png";
		const React_icon = prefx_imgurl_path + "/React-icon.png";
		const j2ee_ico = prefx_imgurl_path + "/j2ee_ico.jpeg";
		const sringboot_ico = prefx_imgurl_path + "/springboot-ico.png";
		const oracle_ico = prefx_imgurl_path + "/oracle-ico.png";
		const postgresql_logo = prefx_imgurl_path + "/postgresql-logo.png";
		const grafana_icon = prefx_imgurl_path + "/grafana-icon.png";
		const tableau_icon = prefx_imgurl_path + "/tableau-icon.png";
		const elk_ico = prefx_imgurl_path + "/elk-ico.png";
		const postman_icon = prefx_imgurl_path + "/postman-icon.png";

		const wbx_icon = prefx_imgurl_path + "/wbx_ico.jpeg";
		const jbr_icon = prefx_imgurl_path + "/jabber-logo.png";
		const csc_icon = prefx_imgurl_path + "/csco-logo.png";
		const spie_icon = prefx_imgurl_path + "/spie1.png";
		const zju_icon = prefx_imgurl_path + "/ZJUniversityLogo.png";
		const phd_icon = prefx_imgurl_path + "/PhD.png";

		const img_CL = prefx_imgurl_path + "/sunxuCL.png";
		const img_RL = prefx_imgurl_path + "/sunxuResume.png";
		const sunx_avatar = prefx_imgurl_path + "/sunxuImg.png";
		const sunxs_kickball = prefx_public_path + "/play_soccer0.png";
		const sfggb_img_Lnk = prefx_imgurl_path + "/sfggb.webp";
		const sunx_doc_RLnk = "/myresume/dwnldfile/2/";
		const sunx_doc_CLnk = "/myresume/dwnldfile/1/";

		const Orgs_set = new Map([ 
			["pubrmico",    pub_resume_ico],
			["wbx",          wbx_icon],
			["jbr",          jbr_icon],
			["csc",          csc_icon],
			["spie",         spie_icon],
			["zju",          zju_icon],
			["phd",          phd_icon],
			["coverletter",  img_CL],
			["resume",       img_RL],
			["kicksoccball", sunxs_kickball],
			["myavatar",     sunx_avatar],
			["docCLnk",      sunx_doc_CLnk],
			["docRLnk",      sunx_doc_RLnk],
			["ToUseLnk",     tou_doc_Lnk],
			["PPolicyLnk",   ppolicy_doc_Lnk],
			["sfggbridge",   sfggb_img_Lnk],
			["bkendSvrURL",  bkendServiceURL]
        ]);

		const myskill_set = new Map([
			["csc_greenbelt",     csc_greenbelt],
			["python",            python],
			["django",            django],
			["django_restfrmwrk", django_restfrmwrk],
			["opencv",            opencv],
			["bootstrap_logo",    bootstrap_logo],
			["tcp_ico",           tcp_ico],
			["c_logo",            c_logo],
			["jira_icon",         jira_icon],
			["wireshark_ico",     wireshark_ico],
			["CPP_ico",           CPP_ico],
			["React_icon",        React_icon],
			["j2ee_ico",          j2ee_ico],
			["sringboot_ico",     sringboot_ico],
			["oracle_ico",        oracle_ico],
			["postgresql_logo",   postgresql_logo],
			["grafana_icon",      grafana_icon],
			["tableau_icon",      tableau_icon],
			["elk_ico",           elk_ico],
			["postman_icon",      postman_icon],
        ]);

		const recogimg_fp1 = prefx_imgurl_path + "/sunxuCscAwards.png";
		const recogimg_fp2 = prefx_imgurl_path + "/sunxuWbxAwards.png";

		const recogimg_fp3 = prefx_secimgurl_path + "/2006_resume.png";
		const recogimg_fpc1 = prefx_secimgurl_path + "/myrecog/sxu1.png";
		const recogimg_fpc2 = prefx_secimgurl_path + "/myrecog/sxu2.png";
		const recogimg_fpc3 = prefx_secimgurl_path + "/myrecog/sxu3.png";
		const recogimg_fpc4 = prefx_secimgurl_path + "/myrecog/sxu4.png";
		const recogimg_fpc5 = prefx_secimgurl_path + "/myrecog/sxu5.png";
		const recogimg_fpc6 = prefx_secimgurl_path + "/myrecog/sxu6.png";
		const recogimg_fpc7 = prefx_secimgurl_path + "/myrecog/sxu7.png";
		const recogimg_fpc8 = prefx_secimgurl_path + "/myrecog/sxu8.png";
		const recogimg_fpc9 = prefx_secimgurl_path + "/myrecog/sxu9.png";

		const myrecognition_set1 = new Map([ 
			["csc_award",    recogimg_fp1],
			["wbxteo_award", recogimg_fp2],
        ]);

		var myrecognition_set = new Map([
			["csc_award",          recogimg_fp1],
			["wbxteo_award",       recogimg_fp2],
			["wbx2006_award",      recogimg_fp3],
			["csc_support_award1", recogimg_fpc1],
			["csc_support_award2", recogimg_fpc2],
			["csc_support_award3", recogimg_fpc3],
			["csc_support_award4", recogimg_fpc4],
			["csc_support_award5", recogimg_fpc5],
			["csc_support_award6", recogimg_fpc6],
			["csc_support_award7", recogimg_fpc7],
			["csc_support_award8", recogimg_fpc8],
			["csc_support_award9", recogimg_fpc9]
		]);


		if (!isDebug) {
			myrecognition_set = myrecognition_set1;
		}

		var slide_idx_set = new Map([ 
			[0, "1"]
        ]);

		if (isDebug) {
			for(  let k = 1; k < 12; k++) {
				slide_idx_set.set(k, String(k + 1));
			}
		} else {
			for(let k = 1; k < 2; k++) {
				slide_idx_set.set(k, String(k + 1));
			}
		}
 
		//  language mastering status bar
		const sknme2prgstatus = new Map([
			["Network",            "95"],
			["Full Stack",         "80"],
			["Production Support", "85"],
			["SQL",                "91"],
			["DevOPs",             "70"],
			["Security",           "75"]
		]);

		const sknme2barcolor = new Map([
			["Network",            "#800080"],
			["Full Stack",         "#7FFFD4"],
			["Production Support", "#FFC0CB"],
			["SQL",                "#A52A2A"],
			["DevOPs",             "#ADD8E6"],
			["Security",           "#808000"]
        ]);
	 
        const sknmedegreeLst = [];
     
		for (const iter of sknme2prgstatus.entries()) {  
			var k = iter[0],v1 = iter[1];
			var v2= sknme2barcolor.get(k);			
            const cpdata1 = new Map([ 
				["name", k], ["valueP", v1], ["valueC", v2]
			]);
            sknmedegreeLst.push(cpdata1);
        }
		//--------------- end var set --------------------------
        resp.render('resume2react', {
            // ========================================================================
            sunx_doc_CLnk:  sunx_doc_CLnk,
            orgs_set:       Orgs_set,
            skill_set:      myskill_set,
            dsp_idx_set:    slide_idx_set,
            recogn_set:     myrecognition_set,
            skl_degree_lst: sknmedegreeLst
            //========================================================================
          });
    } catch (error) {
        appLog.error(`Render faced runtime exception as: ` + error);
        return resp.status(500).json({ message : "system error!" });
    }
}