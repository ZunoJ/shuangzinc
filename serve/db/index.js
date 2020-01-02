const Sequelize = require('sequelize');

const sequelize = new Sequelize('info', 'root', '12345678root', {
    host: 'cdb-csvkp3t0.bj.tencentcdb.com',
    port:'10044',
    dialect: 'mysql',
    sync: { force: true },
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var User = sequelize.define('t_user'/*自定义表名*/, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,    //自增
        comment: "自增id"       //注释:只在代码中有效
    },
    //用户名
    username: {
        type: Sequelize.STRING
    },
    //密码
    pwd: {
        type: Sequelize.STRING(10),
        allowNull: false,//不允许为null
    },
    //状态
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,//默认值是0
    },
    //昵称
    nickname: {
        type: Sequelize.STRING
    },
    //token
    token: {
        type: Sequelize.UUID
    },
    create_time: {
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
            fields: ['id']
        },
     ]
})
User.sync()


module.exports = {
    User
}