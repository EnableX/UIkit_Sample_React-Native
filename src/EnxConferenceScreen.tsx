import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight, Image, Text } from "react-native";
import { EnxVideoView, EnxSetting } from "enx-uikit-react-native";
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: any;
  route: RouteProp<{ params: { token: string } }, 'params'>;
};

type State = {
  embedUrl: string;
  isLoading: boolean;
  key: number;
  backImage?: any;
  setting?: any;
};

class EnxConferenceScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Initialize state
    this.state = {
      embedUrl: 'https://enablex22.vcloudx.com/config/index.json',
      isLoading: true,
      key: 1,
      setting:[
           enxRequiredEventsOption=[{AUDIO:true},{VIDEO:true},{SWITCH_CAMERA:true}, {DISCONNECT:true} ]
          
         ]
    };

    // EnxSetting configurations
    EnxSetting.setJointext("Go Live1");
    EnxSetting.joinAsVideoMute(false);
    EnxSetting.startLiveStreamingAfterJoin(false);

    // RTMP and URL details setup
    const rtmpDetails = {
      rtmpUrl: "rtmp://streamer.ebx.vouchpro.tv:1935/prolive/IFFCO",
    };

    const urlDetails = {
      url: "https://iffco.yourvideo.live/?header=false&grid_line_icon=no&rtmp_mode=yes&toolbar=false&grid_view=gallery&max_video=yes&token=",
      layOut: "",
    };

    EnxSetting.liveStreamingInformation({ rtmpDetails, urlDetails });
  }

  componentDidMount() {
    // Example of setting EnxSetting configurations in componentDidMount
    // EnxSetting.setJointext("Go Live1");
    // EnxSetting.joinAsVideoMute(true);
  }

  componentWillUnmount() {
    // Cleanup logic if necessary
  }

  // Method to force refresh the view
  forceRefresh = () => {
    this.setState((prevState) => ({ key: prevState.key + 1 }));
  };

  onDisconnect = () => {
    this.props.navigation.goBack();
    this.forceRefresh();
  };

  connectError = () => {
    this.props.navigation.goBack();
  };

  customButtonHandler = () => {
    alert("do code here");
  };

  onPageSlide = (pageName: string, isShow: boolean) => {
    console.log(`${pageName} page slide ${isShow}`);
  };

  onUserDataReceived = (data: any) => {
    console.log("userData Received at App level", data);
  };

  connectToRoom = () => {
    console.log("connect to room");
  };

  render() {
    const { route } = this.props;
    const tokenObj = route.params ? route.params.token : "";

    console.log("==========conferenceRoom", tokenObj);
    return (
      <View style={{ flex: 1 }}>
        {/* Action Bar */}
       
        {this.state.isLoading ? (
          <EnxVideoView
            key={this.state.key}
            token={tokenObj}
            embedUrl={this.state.embedUrl}
            setting={this.state.setting}
            customButtonHandler={this.customButtonHandler}
            onDisconnect={this.onDisconnect}
            connectError={this.connectError}
            onPageSlide={this.onPageSlide}
            onUserDataReceived={this.onUserDataReceived}
            connectToRoom={this.connectToRoom}
          />
        ) : null}
      </View>
    );
  }
}

export default EnxConferenceScreen;
