const Sequelize = require('sequelize');

const sequelize = new Sequelize('info', 'root', '12345678root', {
    host: 'cdb-csvkp3t0.bj.tencentcdb.com',
    port:'10044',
    dialect: 'mysql',
    //解决中文输入问题
    define: {
        underscored: true,
        charset:'gbk',
        dialectOptions: {
            charset: "gbk",
            collate: "gbk",
            supportBigNumbers: true,
            bigNumberStrings: true
        }
    },
    sync: { force: true },
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var User = sequelize.define('t_user'/*自定义表名*/, {
    userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //用户账号
    useraccount: {
        type: Sequelize.STRING(10),
        unique: true
    },
    //用户名
    username: {
        type: Sequelize.STRING
    },
    //用户密码
    userpwd: {
        type: Sequelize.STRING(10),
        allowNull: false,//不允许为null
    },
    //用户标签
    usertags: {
        type: Sequelize.STRING
    },
    //用户头像
    userhead:{
        type: Sequelize.STRING
    },
    //用户token
    usertoken:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    //用户创建时间
    createtime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //使用自定义表名
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes:[
	    //普通索引,默认BTREE
        {
            unique: true,
            fields: ['userid']
        },
     ]
})

var Article = sequelize.define('t_article'/*自定义表名*/, {
    articleid: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //用户ID
    userid: {
        type: Sequelize.INTEGER
    },
    //文章内容
    articlecontent: {
        type: Sequelize.TEXT
    },
    //文章类型
    articletype: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    //发布时间
    articletime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    //文章简介
    articleintro: {
        type: Sequelize.STRING
    }
}, {
    //使用自定义表名
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes:[
	    //普通索引,默认BTREE
        {
            unique: true,
            fields: ['articleid']
        },
     ]
})

var Comment = sequelize.define('t_comment'/*自定义表名*/, {
    commentid: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //用户ID
    userid: {
        type: Sequelize.INTEGER
    },
    //文章ID
    articleid: {
        type: Sequelize.INTEGER
    },
    //评论内容
    commentcontent: {
        type: Sequelize.TEXT
    },
    //评价时间
    commenttime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //使用自定义表名
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes:[
	    //普通索引,默认BTREE
        {
            unique: true,
            fields: ['commentid']
        },
     ]
})

var Book = sequelize.define('t_book'/*自定义表名*/, {
    bookid: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //书籍图片
    bookimg: {
        type: Sequelize.INTEGER
    },
    //书籍URL
    bookurl: {
        type: Sequelize.INTEGER
    },
    //加入时间
    addtime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //使用自定义表名
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes:[
	    //普通索引,默认BTREE
        {
            unique: true,
            fields: ['bookid']
        },
     ]
})

var Check = sequelize.define('t_check'/*自定义表名*/, {
    checkid: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //验证码token
    checktoken: {
        type: Sequelize.STRING
    },
    //验证码code
    checkcode: {
        type: Sequelize.STRING
    }
}, {
    //使用自定义表名
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes:[
	    //普通索引,默认BTREE
        {
            unique: true,
            fields: ['checkid']
        },
     ]
})

User.sync()
Article.sync()
Comment.sync()
Book.sync()
Check.sync({force:true})


module.exports = {
    User,
    Article,
    Comment,
    Book,
    Check
}