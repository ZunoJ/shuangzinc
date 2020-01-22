<template>
  <div>
    <div style="height: 620px;display: flex;">
      <div style="margin: auto;">
        <i class="el-icon-edit" style="font-size:50px;"></i>
        <p>还没有上传书籍，可以通知管理员上传哦~</p>
        <el-button type="primary" @click="bookVisible = true" size="mini"
          >上传书籍</el-button
        >
      </div>
    </div>
    <div></div>
    <el-dialog
      title="新增书籍"
      :visible.sync="bookVisible"
      width="450px"
      center
      @closed="resetbook"
    >
      <el-form
        ref="bookForm"
        :model="bookForm"
        :rules="bookRules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="书籍名称" prop="bookname">
          <el-input
            v-model="bookForm.bookname"
            placeholder="请输入书籍名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="书籍链接" prop="bookurl">
          <el-input
            v-model="bookForm.bookurl"
            placeholder="请输入书籍链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="书籍图片" prop="bookimg">
          <el-upload
            class="avatar-uploader"
            action="/api/headupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="bookForm.bookimg"
              :src="bookForm.bookimg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bookVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addBooks" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { uploadImgToBase64 } from "../utils";
import httpserve from "../serve/api";

export default {
  name: "bookHome",
  data() {
    return {
      bookVisible: false,
      bookForm: { bookimg: "", bookurl: "", bookname: "" },
      bookRules: {
        bookname: [
          { required: true, message: "请输入书籍名称", trigger: "blur" }
        ],
        bookurl: [
          { required: true, message: "请输入书籍链接", trigger: "blur" }
        ],
        bookimg: [
          { required: true, message: "请上传书籍图片", trigger: "blur" }
        ]
      }
    };
  },
  props: [], // 接收父组件的方法
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  methods: {
    addBooks() {
      let params = {
        ...this.bookForm,
        useraccount: this.userInfo.useraccount
      };
      httpserve.addBooks(params).then(res => {
        if (res.flag === "S") {
          this.$message.success("发布成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    queryBooks() {
      httpserve.queryBooks().then(res => {
        console.log(res);
      });
    },
    resetbook() {
      this.bookForm = {
        bookimg: "",
        bookurl: "",
        bookname: ""
      };
    },
    handleAvatarSuccess(res, file) {
      this.bookForm.bookimg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarChange(file) {
      uploadImgToBase64(file.raw).then(res => {
        this.bookForm.bookimg = res;
      });
    }
  },
  created() {
    this.queryBooks();
  }
};
</script>

<style lang="scss" scoped></style>
