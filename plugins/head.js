const MyPlugin = { 
  // 插件需要install方法
	install (Vue, options) { 
		Vue.component('my-head',{
      functional: true,  // 1. functional设置为true，标示是函数式组件
      props: ['level', 'title', 'icon'],   
      // 在函数式组件中，没有this
      // 所以render函数，提供第二个参数作为上下文             
      render(h, context){ 
        // 之前从this上拿取'level', 'title', 'icon'，就要变化了
        // 2. 从context.props上去拿取
        const { level, title, icon } = context.props;
        let children = [];           
        const svgVnode = h(
          'svg',
          { class: 'icon' },
          [h('use',{attrs: {"xlink:href": `#icon-iconfinder_${icon}_C_`}})] 
        );
        // 3. 子元素获取: 增加context参数，并将this.$slots.default更新为context.children，然后将this.level更新为context.props.level。
        children = [svgVnode, ...context.children];

       return h(
          'h'+level, 
          {attrs:  { title: title }},
          children,
        )
      }
    });
	} 
}
// 判断当前环境  并且判断是否已经存在Vue
if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(MyPlugin);
}