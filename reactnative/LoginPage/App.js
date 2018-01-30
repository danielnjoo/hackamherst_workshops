import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          The Nellie, a cruising yawl, swung to her anchor without a flutter of
          the sails, and was at rest. The flood had made, the wind was nearly
          calm, and being bound down the river, the only thing for it was to
          come to and wait for the turn of the tide.
        </Text>
        <Text>
          The sea-reach of the Thames stretched before us like the beginning of
          an interminable waterway. In the offing the sea and the sky were
          welded together without a joint, and in the luminous space the tanned
          sails of the barges drifting up with the tide seemed to stand still in
          red clusters of canvas sharply peaked, with gleams of varnished
          sprits. A haze rested on the low shores that ran out to sea in
          vanishing flatness. The air was dark above Gravesend, and farther back
          still seemed condensed into a mournful gloom, brooding motionless over
          the biggest, and the greatest, town on earth.
        </Text>
        <Text>
          The Director of Companies was our captain and our host. We four
          affectionately watched his back as he stood in the bows looking to
          seaward. On the whole river there was nothing that looked half so
          nautical. He resembled a pilot, which to a seaman is trustworthiness
          personified. It was difficult to realize his work was not out there in
          the luminous estuary, but behind him, within the brooding gloom.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
