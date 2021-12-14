
import { selectTeamUserList } from "@/api/dictionary";
import { invtwrList, towersPMS } from "@/api/invtwr";
export const dictMixins = {
    data() {
        return {
            dy_teamUserList: [],
            dy_invtwrList: []
        };
    },
    methods: {
        //查询班组查人员列表
        selectTeamUserList(id) {
            selectTeamUserList({
                deptId: id || this.form.teamId
            }).then(({ data }) => {
                this.dy_teamUserList = data.data.records || [];
            });
        },
        //杆塔列表
        // getInvtwrList() {
        //     return new Promise((resolve,reject) => {
        //         invtwrList({
        //             lineId: this.form.lineId || ""
        //         }).then(({ data }) => {
        //             this.dy_invtwrList = data.data || [];
        //             resolve(data.data);
        //         }).catch(()=>{
        //             reject();
        //         });
        //     });
        // },
        getInvtwrList() {
            return new Promise((resolve, reject) => {
                towersPMS({
                    line: this.form.lineId || ""
                }).then(({ data }) => {
                    console.log(data, "杆塔data====");
                    this.dy_invtwrList = data.data.records || [];
                    resolve(data.data.records);
                }).catch(() => {
                    reject();
                });
            });
        },
    }
};