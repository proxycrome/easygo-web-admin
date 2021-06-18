export const getCenter =  ({justifyContent , alignItems , display, flexDirection, flexWrap} = {}) => {
    return {
     display : display ?? 'flex',
     'justify-content': justifyContent ?? 'center',
     'align-items': alignItems ?? 'center',
     'flex-wrap': flexWrap ?? 'wrap',
     'flex-direction': flexDirection ?? 'row'
    }
  }