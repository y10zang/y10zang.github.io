import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "MyDocs",
  description: "A Notes Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 将 outline 设为 false 即可全局隐藏右侧目录
    // outline: false,
    // 如果你想保留目录但调整层级（例如只显示 h2 和 h3），可以写数字：outline: [2, 3],
    outline: [1, 2],
    nav: [
      { text: 'Home', link: '/' }
      // ,
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Docs',
          items: [
            { text: 'Index', link: '/README' },
            { text: 'Computer', link: '/computer/README' },
            { text: 'Math', link: '/math/README' },
          ]
        }
      ],
      '/computer/': [
        {
          text: 'Computer',
          items: [
            { text: 'Index', link: '/README' },
            { text: 'Computer', link: '/computer/README' },
            { text: 'Java', items: [
              { text: 'Java基础', link: '/computer/java/README' },
              { text: 'HelloWorld', link: '/computer/java/helloworld' },
              { text: 'SpringBoot基础', link: '/computer/java/springBoot' },
              { text: 'SpringBoot注解速查', link: '/computer/java/springBootAnnotation' },
              { text: 'JavaEE', link: '/computer/JavaEE/README' },
            ]},
            { text: 'Linux', items: [
              { text: 'Linux', link: '/computer/Linux/README' },
              { text: 'Shell', link: '/computer/Linux/shell' },
            ]},
            { text: 'Python', items: [
              { text: 'Python', link: '/computer/python/README' },
              { text: 'Python基础', link: '/computer/python/python基础' },
              { text: 'test1', link: '/computer/python/test1' },
            ]},
            { text: 'BigData', items: [
              { text: 'BigData', link: '/computer/bigData/README' },
              { text: 'MySQL', link: '/computer/bigData/MySQL' },
              { text: 'HDFS', link: '/computer/bigData/HDFS' },
            ]}
          ]
        }
      ],
      '/computer/JavaEE/':[
        {
          text: 'JavaEE',
          items: [
                { text: 'Index', link: '/README' },
                { text: 'Computer', link: '/computer/README' },
                { text: 'JavaEE', link: '/computer/JavaEE/README' },
                {text: 'Lambda和Stream', link: '/computer/JavaEE/Lambda和Stream'},
                {text: 'springBootHelloWorld', link: '/computer/JavaEE/springBootHelloWorld'},
                {text: 'SpringBoot测试JUnit', link: '/computer/JavaEE/SpringBoot测试JUnit'},
                {text: 'SpringBoot_MybatisPlus_代码生成', link: '/computer/JavaEE/SpringBoot_MybatisPlus_代码生成'},
                {text: 'SpringBoot3+SpringSecurity6+OAuth2生产实战', link: '/computer/JavaEE/SpringBoot3+SpringSecurity6+OAuth2生产实战'},
                {text: 'SpringBoot3整合Sa-Token', link: '/computer/JavaEE/SpringBoot3整合Sa-Token'},
                {text: 'SpringBoot3整合SpringSecurity', link: '/computer/JavaEE/SpringBoot3整合SpringSecurity'},
                {text: 'SpringBoot整合Elastic-Job', link: '/computer/JavaEE/SpringBoot整合Elastic-Job'},
                {text: 'AQS是什么_为什么Java并发大厦的地基是它  ', link: '/computer/JavaEE/AQS是什么_为什么Java并发大厦的地基是它'},
                {text: 'if-null_to_Optional', link: '/computer/JavaEE/if-null_to_Optional'},
              ],
        }
      ],
      '/math/': [
        {
          text: 'Math',
          items: [
            { text: 'Index', link: '/README' },
            { text: 'Math', link: '/math/README' },
            { text: 'Analysis', items: [
              { text: 'Analysis', link: '/math/Analysis/README' },
              { text: '外微分小结', link: '/math/Analysis/外微分小结' },
              { text: '做题杂记1', link: '/math/Analysis/做题杂记1' },
            ]},
            { text: 'Algebra', items: [
              { text: 'Algebra', link: '/math/Algebra/README' },
              { text: '做题杂记2', link: '/math/Algebra/做题杂记2' },
            ]},
            { text: 'ODE', link: '/math/ODE' },
            { text: 'Complex', link: '/math/complex' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/y10zang' }
    ]
  },
  markdown: {
    // config: (md) => {
    //   md.use(mathjax3) // 一行代码搞定 SSR 渲染
    // },
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  }
})
