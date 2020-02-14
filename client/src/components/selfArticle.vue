<template>
  <div v-loading="loading" class="loadingHeight">
    <div style="height: 620px;display: flex;" v-if="!isHas && !loading">
      <div style="margin: auto;">
        <i class="el-icon-edit" style="font-size:50px;"></i>
        <p v-if="articletype == 1">还没有发表文章，可以先去发表文章哦~</p>
        <p v-if="articletype == 2">还没有发表杂谈，可以先去发表杂谈哦~</p>
      </div>
    </div>
    <div v-if="showType === 1 && isHas">
      <transition appear appear-to-class="animated fadeInUp">
        <div>
          <section
            class="posts-expand"
            v-for="(item, index) in articleInfos"
            :key="index"
            id="article"
          >
            <article>
              <div>
                <header>
                  <h1 class="post-title">{{ item.articletitle }}</h1>
                  <div class="post-meta">
                    <span>
                      <i class="el-icon-date"></i>
                      Posted on {{ item.articletime }}
                    </span>
                    <el-divider direction="vertical"></el-divider>
                    <span>
                      <i class="el-icon-folder"></i>
                      In
                      <a class="post-typea" v-if="item.articletype === 1"
                        >Article</a
                      >
                      <a class="post-typea" v-if="item.articletype === 2"
                        >Essay</a
                      >
                    </span>
                    <el-divider direction="vertical"></el-divider>
                    <span>
                      <el-popover
                        placement="bottom"
                        width="160"
                        v-model="chatVisibles[index]"
                      >
                        <el-input type="textarea" :rows="3" v-model="chatBody">
                        </el-input>
                        <div
                          style="text-align: center; margin: 0; margin-top: 10px;"
                        >
                          <!-- <el-button
                      size="mini"
                      type="text"
                      @click="chatVisibles[index] = false"
                      >取消</el-button
                    > -->
                          <el-button
                            type="primary"
                            size="mini"
                            @click="makeComment(item.articleid)"
                            >评论</el-button
                          >
                        </div>
                        <i
                          class="el-icon-chat-square"
                          slot="reference"
                          style="cursor:pointer;"
                        ></i>
                      </el-popover>
                    </span>
                  </div>
                </header>
                <div class="post-body">
                  <p>
                    {{ item.articleintro }}
                  </p>
                  <div class="post-button">
                    <a class="btn" @click="articleDetail(item.articleid)">
                      Read more »
                    </a>
                  </div>
                </div>
                <footer>
                  <div class="post-footer"></div>
                </footer>
              </div>
            </article>
          </section>
        </div>
      </transition>
    </div>
    <transition enter-active-class="animated fadeIn">
      <div v-if="showType === 2 && isHas">
        <div class="posts-expand">
          <header>
            <h1 class="post-title">{{ articleInfo.articletitle }}</h1>
            <div class="post-meta">
              <span>
                <i class="el-icon-date"></i>
                Posted on {{ articleInfo.articletime }}
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                <i class="el-icon-folder"></i>
                In
                <a class="post-typea" v-if="articleInfo.articletype === 1"
                  >Article</a
                >
                <a class="post-typea" v-if="articleInfo.articletype === 2"
                  >Essay</a
                >
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                <el-popover
                  placement="bottom"
                  width="160"
                  v-model="chatVisible"
                >
                  <el-input type="textarea" :rows="3" v-model="chatBody">
                  </el-input>
                  <div style="text-align: center; margin: 0; margin-top: 10px;">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="makeComment(articleInfo.articleid)"
                      >评论</el-button
                    >
                  </div>
                  <i
                    class="el-icon-chat-square"
                    slot="reference"
                    style="cursor:pointer;"
                  ></i>
                </el-popover>
              </span>
            </div>
          </header>
          <p
            v-html="articleInfo.articlecontent"
            style="text-align: -webkit-auto;line-height: 28px;"
          ></p>
          <div class="post-footer"></div>
          <div
            style="text-align: left;padding: 10px 0;"
            v-for="(item, index) of comments"
            :key="index"
          >
            <span>一只肥龙猫</span>
            <span
              style="display: inline-block;margin: 0 15px;font-size: 12px;color: #999;"
              >{{ item.commenttime }}</span
            >
            <span
              @click="deleteComments(item.commentid)"
              style="cursor:pointer;font-size:14px;"
              v-if="userInfo.useraccount == item.useraccount"
              >删除</span
            >
            <p style="line-height: 28px;font-size: 14px;">
              {{ item.commentcontent }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import httpserve from "../serve/api";
import { mapGetters } from "vuex";
import * as moment from "moment";

export default {
  name: "selfArticle",
  data() {
    return {
      loading: false,
      articleInfos: [],
      articleInfo: {},
      chatVisibles: [],
      chatVisible: false,
      chatBody: "",
      showType: 1, // 1 文章列表 2 文章详情
      isHas: false, // 是否有文章
      comments: [] // 评价列表
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  props: {
    articletype: String
  },
  methods: {
    gettingArticles() {
      this.loading = true;
      let params = {
        useraccount: this.userInfo.useraccount,
        articletype: this.articletype
      };
      httpserve.queryArticles(params).then(res => {
        this.loading = false;
        if (res.flag === "S") {
          this.articleInfos = res.data;
          if (this.articleInfos.length > 0) {
            this.isHas = true;
          } else {
            this.isHas = false;
          }
        } else {
          this.$message.error(res.msg);
          if (res.msg === "你还没有登录，快去登录吧!") {
            this.$emit("offline");
          }
        }
      });
    },
    makeComment(id) {
      if (this.chatBody.trim() == "") {
        this.$message.warning("请输入评论");
        return;
      }
      let params = {
        useraccount: this.userInfo.useraccount,
        articleid: id,
        commentcontent: this.chatBody
      };
      httpserve.publishComments(params).then(res => {
        if (res.flag === "S") {
          this.$message.success("发布成功");
          this.comments.push({
            useraccount: this.userInfo.useraccount,
            articleid: id,
            commentcontent: this.chatBody,
            commenttime: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
          });
        } else {
          this.$message.error(res.msg);
        }
        this.chatBody = "";
      });
      document.getElementById("app").click();
    },
    // 查询文章详情
    articleDetail(id) {
      this.showType = 2;
      this.articleInfo = this.articleInfos.find(item => {
        return item.articleid === id;
      });
      this.queryComments(id);
    },
    queryComments(id) {
      let params = {
        articleid: id
      };
      httpserve.queryComments(params).then(res => {
        if (res.flag === "S") {
          this.comments = res.data;
          this.comments.map(item => {
            return (item.commenttime = moment(
              new Date(item.commenttime)
            ).format("YYYY-MM-DD hh:mm:ss"));
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    deleteComments(id) {
      let self = this;
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = {
            commentid: id,
            useraccount: self.userInfo.useraccount
          };
          httpserve.deleteComments(params).then(res => {
            if (res.flag === "S") {
              this.$message.success("删除成功！");
              this.queryComments(this.articleInfo.articleid);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  watch: {
    articletype() {
      this.isHas = false;
      this.showType = 1;
      this.gettingArticles();
    }
  },
  created() {
    this.gettingArticles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.animated {
  animation-duration: 2s;
}
.loadingHeight {
  min-height: 620px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.posts-expand {
  padding-top: 40px;
  .post-title {
    text-align: center;
    word-break: break-word;
    font-weight: 400;
    font-size: 22px;
  }
  .post-meta {
    margin: 3px 0 60px 0;
    color: #999;
    font-size: 12px;
    text-align: center;
  }
  .post-body {
    text-align: justify;
    p {
      font-size: 14px;
      line-height: 28px;
    }
  }
  .post-button {
    margin-top: 40px;
    text-align: center;
  }
  .btn {
    display: inline-block;
    cursor: pointer;
    padding: 0 20px;
    font-size: 14px;
    color: #555;
    background: #fff;
    border: 2px solid #555;
    text-decoration: none;
    border-radius: 2px;
    transition-property: background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    line-height: 2;
    &:hover {
      color: #fff;
      background-color: #555;
    }
  }
  .post-footer {
    display: block;
    margin: 80px auto 60px;
    width: 8%;
    height: 1px;
    background: #ccc;
    text-align: center;
  }
  .post-typea {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #222;
    }
  }
}
</style>
