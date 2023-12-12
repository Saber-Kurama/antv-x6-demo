import './entity.css'

export default defineComponent({
  name: 'Entity',
  setup: () => {
    // eslint-disable-next-line react/display-name
    return () => {
      return (
        <a-popover title="Title" v-slots={{
          content: () => (
          <div>
             <p>Here is the text content</p>
          </div>
          ),
        }}>
          <div className="entityWrap">
            <div className="entityWrap-line"></div>
            <div className="entityWrap-body">
              <div className="entityWrap-body-title">
                www
              </div>
              <div className="entityWrap-body-desc">
                22
                <div className="entityWrap-body-desc222">
                  撒打算打算
                </div>
              </div>
            </div>
          </div>
        </a-popover>
      )
    }
  },
})
