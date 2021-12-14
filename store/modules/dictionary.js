import { getList } from "@/api/dictionary";
import to from "../../utils/awaie-to-js";
const listObj = {
    "YWDW": {
        url: "/blade-system/dept/listDeptsOrTeams?deptCategory=1" //运维单位==公司
    },
    "YXCJ": {
        url: "/blade-system/dept/listDeptsOrTeams?deptCategory=2" //巡视班组 传1表示公司，2表示车间 3表示班组 ，都不传就是全部
    },
    "YSBZ": {
        url: "/blade-system/dept/listDeptsOrTeams?deptCategory=3" //巡视班组 传1表示公司，2表示车间 3表示班组 ，都不传就是全部
    },
    "deptList": {
        url: "/blade-system/dept/list" //单位 车间 班组树列表
    },
    "XSXL": {
        url: "/blade-sd/equline/list?current=1&size=10" //巡视线路
    },
    "XSLX": {
        url: "/blade-system/dict/dictionary?code=XSLX" //巡视类型
    },
    "risk_level": {
        url: "/blade-system/dict/dictionary?code=risk_level" //风险等级
    },
    "RWLX": {
        url: "/blade-system/dict/dictionary?code=RWLX" //任务类型
    },
    "defect_nature": {
        url: "/blade-system/dict/dictionary?code=defect_nature" //缺陷性质
    },
    "find_way": {
        url: "/blade-system/dict/dictionary?code=find_way" //发现方式
    },
    "QXZT": {
        url: "/blade-system/dict/dictionary?code=QXZT" //缺陷状态
    },
    "yes_no": {
        url: "/blade-system/dict/dictionary?code=yes_no" //	是否
    },
    "QXLY": {
        url: "/blade-system/dict/dictionary?code=QXLY" //	缺陷来源
    },
    "SBZT": {
        url: "/blade-system/dict/dictionary?code=SBZT" //	设备状态
    },
    "ZYFL": {
        url: "/blade-system/dict/dictionary?code=ZYFL" //	专业分类
    },
    "voltage_level": {
        url: "/blade-system/dict/dictionary?code=voltage_level" //	电压等级
    },
    "YHZT": {
        url: "/blade-system/dict/dictionary?code=YHZT" //	隐患状态
    },
    "LOCATION": {
        url: "/blade-system/dict/dictionary?code=LOCATION" //	大小号侧
    },
    "basetreeList": {
        url: "/blade-sd/basetree/list?current=1&size=1000" //树种列表
    },
    "phase": {
        url: "/blade-system/dict/dictionary?code=phase" //	相别
    },
    "SBDX": {
        url: "/blade-system/dict/dictionary?code=SBDX" //	设备导线
    },
    "plan_state": {
        url: "/blade-system/dict/dictionary?code=plan_state" //	计划状态
    },
    "QXCLYJ": {
        url: "/blade-system/dict/dictionary?code=QXCLYJ" //	缺陷处理意见
    },
    "JHXQDW": {
        url: "/blade-system/dict/dictionary?code=JHXQDW" //	计划消缺单位
    },
    "weather": {
        url: "/blade-system/dict/dictionary?code=weather" //天气
    },
    "DZJDXS": {
        url: "/blade-system/dict/dictionary?code=DZJDXS" //电阻接地形式
    },
    "FBGCWZ": {
        url: "/blade-system/dict/dictionary?code=FBGCWZ" //覆冰观测位置
    },
    "CWDWZ": {
        url: "/blade-system/dict/dictionary?code=CWDWZ" //红外测温点位置
    },
    "LJXS": {
        url: "/blade-system/dict/dictionary?code=LJXS" //连接形式
    },
    "YCJTWZ": {
        url: "/blade-system/dict/dictionary?code=YCJTWZ" //异常接头位置
    },
    "FBLX": {
        url: "/blade-system/dict/dictionary?code=FBLX" //覆冰类型
    },
    "FSBJYXS": {
        url: "/blade-system/dict/dictionary?code=FSBJYXS" //风速不均匀系数
    },
    "sign_reason": {
        url: "/blade-system/dict/dictionary?code=sign_reason" //手动签到原因
    },
    "GCQXFL": {
        url: "/blade-system/dict/dictionary?code=GCQXFL" //工程缺陷分类
    },
    "YSGCLB": {
        url: "/blade-system/dict/dictionary?code=YSGCLB" //验收过程类别
    },
    "regionList": {
        url: "/blade-system/region/lazy-tree?parentCode=5001" //	地市单位
    },
    "listDW": {
        url: "/blade-sd/depleader/listDW"
    },
    "defclaDetail": {
        url: "/blade-sd/defcla/detail"//部件详情
    },
    "getTroTypeLevel1": {
        url: "/blade-sd/trocla/getTroTypeLevel?claType=1"//外力隐患等级
    },
    "getTroTypeLevel2": {
        url: "/blade-sd/trocla/getTroTypeLevel?claType=2"//树林隐患等级
    },
};
const dictionary = {
    state: {
        List: {} //所有数据集合
    },
    actions: {
        async getList({ commit, state }, value) {
            if (state.List[value]) {
                return state.List[value];
            }
            const [err, response] = await to(getList(listObj[value].url)); //支持第二参数 params 传参
            // console.log(response, "response");
            // console.log(err, "err");
            // return [];
            if (err) return [];
            let data = response?.data?.data || [];
            const res = {
                data: data,
                type: value
            };
            commit("setList", res);
            return data;
        }
    },
    mutations: {
        setList(state, res) {
            state.List[res.type] = res.data || [];
        },
        restDictionary(state) {
            state.List = {};
        }
    }
};

export default dictionary;