<template>
  <div>
    <section class="posts-expand">
      <article>
        <div>
          <header>
            <h1 class="post-title">写给聪明人</h1>
            <div class="post-meta">
              <span>
                <i class="el-icon-date"></i>
                Posted on 2019-01-12
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                <i class="el-icon-folder"></i>
                In
                <a class="post-typea">Article</a>
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
                  <div style="text-align: center; margin: 0; margin-top: 10px;">
                    <el-button
                      size="mini"
                      type="text"
                      @click="chatVisibles[index] = false"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="makeComment(index)"
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
              从武汉，到北京，再到广州，然后是英国，一路上说难不难，说容易也不容易。我的原生家庭不太能给我提供太多帮助，于是每到一个新地方，一切都得靠自己打拼，很多东西需要自己摸索。现在慢慢静下来，就想写一篇经验性的文章，给后辈里的聪明人看。因为我想，如果你是聪明人，一定能懂得这篇文章里的含义。
            </p>
            <div class="post-button">
              <a class="btn">
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
</template>

<script>
export default {
  name: "selfArticle",
  props: {
    msg: Array
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
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #222;
    }
  }
}
</style>
