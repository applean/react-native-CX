import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView
} from 'react-native'

export default class extends Component {

  static propTypes = {
    data: PropTypes.object
  };

  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid]
    })
    this.state = {
      dataSource: cloneWithData(dataSource, props.data)
    }
  }

  render () {
    return (
      <ListView
        {...this.props}
        initialListSize={10}
        pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }

  renderRow = (item) => {
    return (
      <View style={{padding: 12}}>
        <Text style={{fontSize: 16, color: '#6199b1'}}>{item.title}</Text>
        {
          item.author &&
          <View style={{flexDirection: 'row', paddingLeft: 5, marginTop: 15}}>
            {
              item.author_avatars.length > 0
              ? item.author_avatars.map((uri, index) =>
                <Image key={index} style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={{uri}}/>
                )
              : <Image style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={require('../assets/default_avatar.png')}/>
            }
            <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
              <Text numberOfLines={1} style={styles.font}>{item.author}</Text>
              <Text numberOfLines={1} style={{marginTop: 5, color: '#777777', fontSize: 11}}>{item.author_info}</Text>
            </View>
          </View>
        }
      </View>
    )
  }

  renderSectionHeader = (sectionData, time) => {
    const startTime = sectionData[0].start_at.slice(11, 16)
    const endTime = sectionData[0].end_at.slice(11, 16)
    return (
      <View style={{backgroundColor: '#eeeeee'}}>
        <Text style={[{margin: 6, marginLeft: 8}, styles.font]}>{startTime}~{endTime}</Text>
      </View>
    )
  }
}

function cloneWithData (dataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([])
  }
  return dataSource.cloneWithRowsAndSections(data)
}

const styles = StyleSheet.create({
  font: {
    fontSize: 12,
    color: '#555555'
  }
})
