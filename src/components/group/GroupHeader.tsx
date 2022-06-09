import './source-header.css'

export default defineComponent({
  name: 'GroupHeader',
  setup: () => {
    // eslint-disable-next-line react/display-name
    return () => {
      return (
        <div className="ax6-source-header-wrap">
          <div className="ax6-source-header-wrap-line"></div>
          <div className="ax6-source-header-text-wrap">
            <div className="ax6-source-header-text">
              名称
            </div>
          </div>
        </div>
      )
    }
  },
})
