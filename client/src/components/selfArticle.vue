<template>
  <div>
    <div v-if="showType === 1">
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
                  <a class="post-typea" v-if="item.articletype === 2">Essay</a>
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
                        @click="makeComment(item.id)"
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
    <div v-if="showType === 2">
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
              <el-popover placement="bottom" width="160" v-model="chatVisible">
                <el-input type="textarea" :rows="3" v-model="chatBody">
                </el-input>
                <div style="text-align: center; margin: 0; margin-top: 10px;">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="makeComment(articleInfo.id)"
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
        <p v-html="articleInfo.articlecontent"></p>
      </div>
    </div>
  </div>
</template>

<script>
import httpserve from "../serve/api";
import { mapGetters } from "vuex";

export default {
  name: "selfArticle",
  data() {
    return {
      articleInfos: [],
      articleInfo: {},
      chatVisibles: [],
      chatVisible: false,
      chatBody: "",
      showType: 1 // 1 文章列表 2 文章详情
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
      let params = {
        useraccount: this.userInfo.useraccount,
        articletype: this.articletype
      };
      httpserve.queryArticles(params).then(res => {
        if (res.flag === "S") {
          this.articleInfos = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    makeComment(index) {
      console.log(index);
      document.getElementById("article").click();
    },
    // 查询文章详情
    articleDetail(id) {
      this.showType = 2;
      this.articleInfo = this.articleInfos.find(item => {
        return item.articleid === id;
      });
    }
  },
  created() {
    this.gettingArticles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
