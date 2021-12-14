const config = {
    development: {
        // baseUrl: "http://192.168.0.77",
        // baseUrl: "http://192.168.0.200",
        // baseUrl: "/test",
        // baseUrl: "https://j3527025h6.qicp.vip/api",
        // baseUrl: "https://qywx.cq.sgcc.com.cn:56784/iguowang/cqef/h5/api",
        baseUrl: "http://101.35.200.145:18000",
    },
    IGWTEST: { //i国网测试
        baseUrl: "https://qywx.cq.sgcc.com.cn:56784/iguowang/cqef/h5/api",
        DEBUG: true //true为js网络请求，false为壳网络请求
    },
    IGWPRO: { //i国网正式
        // baseUrl: "/api",
        // baseUrl: "/iguowang/cqef/h5/api",
		// baseUrl: "https://j3527025h6.qicp.vip/api",
        baseUrl: "https://qywx.cq.sgcc.com.cn:56784/iguowang/cqef/h5/api", 
    }
};
export default config[String(process.env.PRODUCTION)] || config.development;
