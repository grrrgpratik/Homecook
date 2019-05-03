import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Color, Images } from 'common_f';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from './styles';

const { width } = Dimensions.get('window');
const ENTRIES1 = [
  {
    title: 'Momo Chicken',
    subtitle: 'Rs 150',
    illustration: Images.ChickenMomo
  },
  {
    title: 'Biryani Chicken',
    subtitle:
      'Biryani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent.',
    illustration: Images.BiryaniChicken
  },
  {
    title: 'Buff Samaya Baji Set',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: Images.BuffSamayaBaji
  },
  {
    title: 'Chicken sandwich',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: Images.AlooDum
  }
];

const mocks = [
  {
    id: 1,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    saved: true,
    location: '0.4 Km from you',
    temperature: 34,
    title: 'Santorini',
    description:
      'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC',
    rating: 4.3,
    price: 224.0,
    reviews: 3212,
    preview:
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    saved: false,
    location: '0.4 Km from you',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 4.6,
    reviews: 3212,
    price: 122.0,
    preview:
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 3,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    saved: true,
    location: '0.4 Km from you',
    temperature: 34,
    title: 'Santorini',
    description: 'Santorini - Description',
    rating: 3.2,
    reviews: 3212,
    price: 432.0,
    preview:
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 4,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    location: '0.4 Km from you',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 5,
    reviews: 3212,
    price: 400.0,
    preview:
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

class Home extends Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1
    };
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              paddingBottom: 5
            }}
          >
            <View style={styles.options}>
              <Text style={styles.locationText}>Your Location</Text>
              <Text style={styles.actualLocation}>Ranipauwa</Text>
            </View>
          </View>
          <View style={styles.settings}>
            <Image source={Images.IconMap} style={styles.iconMap} />
            <Image source={Images.Profile} style={styles.avatar} />
          </View>
        </View>
      </View>
    );
  }

  renderRecommended = () => {
    return (
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendText}>Recommended</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate='normal'
            scrollEventThrottle={100}
            snapToInterval={width - 60}
            snapToAlignment='center'
            style={{ overflow: 'visible' }}
            data={mocks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) =>
              this.renderRecommendation(item, index)
            }
          />
        </View>
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    const isLastItem = index === mocks.length - 1;
    return (
      <View
        style={[
          styles.recommendation,
          styles.shadow,
          index === 0 ? { marginLeft: 32 } : null,
          isLastItem ? { marginRight: 24 } : null
        ]}
      >
        <View style={[styles.recommendationHeader, styles.shadow]}>
          <Image
            style={styles.recommendationImage}
            source={{ uri: item.preview }}
          />
        </View>
        <View style={[styles.bottomContainer, styles.shadow]}>
          <Text style={styles.recommendationTitle}>{item.title}</Text>
          <Text style={styles.recommendlocation}>{item.location}</Text>
          <View style={styles.recommendRating}>
            {this.renderRatings(item.rating)}
            <Text style={styles.recommendPrice}>Rs. {Number(item.price)}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name='star'
          key={`star-${index}`}
          size={14}
          color={Color[activeStar ? 'tertiary' : 'gray']}
          style={{ justifyContent: 'space-evenly' }}
        />
      );
    });
  }

  renderCarousels = () => {
    return (
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate='normal'
          scrollEventThrottle={100}
          // snapToInterval={width - 40}
          snapToAlignment='center'
          style={{ overflow: 'visible' }}
          data={ENTRIES1}
          keyExtractor={(item, index) => `${item.title}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          renderItem={({ item }) => this.renderCarousel(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderCarousel = item => {
    console.log('inside render', item);
    return (
      <TouchableWithoutFeedback style={[styles.shadow, { elevation: 4 }]}>
        <View style={{ marginBottom: 35 }}>
          <Image
            style={styles.destination}
            imageStyle={{ borderRadius: 7 }}
            resizeMode='cover'
            source={item.illustration}
          />
          <View style={[styles.destinationInfo, styles.shadow]}>
            <Text style={{ color: Color.black, fontFamily: 'Nunito-Black' }}>
              {item.title}
            </Text>
            <View style={styles.carouselTextView}>
              <Text style={{ color: Color.gray2, fontFamily: 'Nunito-Bold' }}>
                {item.subtitle.split('').slice(0, 50)}...
              </Text>
              <FontAwesome
                name='chevron-right'
                size={16 * 0.75}
                color={Color.gray2}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderDots() {
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={styles.dotsContainer}>
        {mocks.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth }
              ]}
            />
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {this.renderHeader()}
        {this.renderCarousels()}
        {this.renderRecommended()}
      </ScrollView>
    );
  }
}

export default Home;
