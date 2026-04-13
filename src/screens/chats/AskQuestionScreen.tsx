import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RS } from '@helpers';
import { palette } from '@theme';
import { styles } from './styles';
import { Block, Text, SvgIcon } from '@components';
import firestore from '@react-native-firebase/firestore';

const AskQuestionScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  // Form state
  const [emailNotify, setEmailNotify] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('School Based');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false);

  const categories = ['School Based', 'Academic Based'];
  const institutions = [
    'University of Lagos',
    'University of Ibadan',
    'Obafemi Awolowo University',
    'Covenant University',
  ];

  // Submit question
  const submitQuestion = async () => {
    if (!description) return;

    try {
      await firestore()
        .collection('questions')
        .add({
          question: description,
          category: selectedCategory,
          institution: selectedInstitution,
          userName: 'Anonymous',
          answers: 0,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setDescription('');
      navigation.goBack();
    } catch (err) {
      console.log('Error adding question:', err);
    }
  };

  return (
    <Block flex={1} style={[styles.container, { backgroundColor: '#F5F5F5' }]}>
      {/* Header */}
      <Block
        style={{ marginTop: insets.top, paddingVertical: RS(16) }}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>Jamb Brochure</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: RS(20), top: RS(16) }}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RS(140), paddingHorizontal: RS(16) }}
      >
        {/* Category */}
        <Text style={styles.label}>Select Category</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Text style={styles.dropdownText}>{selectedCategory}</Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>
        <Block style={[styles.dropdownMenu, { display: showCategoryDropdown ? 'flex' : 'none' }]}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedCategory(item);
                setShowCategoryDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Institutions */}
        <Text style={styles.label}>Target Institutions</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowInstitutionDropdown(!showInstitutionDropdown)}
        >
          <Text style={selectedInstitution ? styles.dropdownText : styles.placeholder}>
            {selectedInstitution || 'Select institution'}
          </Text>
          <Text style={[styles.arrow, { color: '#C00000' }]}>▼</Text>
        </TouchableOpacity>
        <Block style={[styles.dropdownMenu, { display: showInstitutionDropdown ? 'flex' : 'none' }]}>
          {institutions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedInstitution(item);
                setShowInstitutionDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="What’s your question?"
          multiline
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
        />

        {/* Email Checkbox */}
        <TouchableOpacity onPress={() => setEmailNotify(!emailNotify)}>
          <Block row align="center" style={styles.checkRow}>
            <Block style={styles.checkbox}>{emailNotify && <Text style={styles.tick}>✓</Text>}</Block>
            <Text style={styles.checkText}>
              Send email notification to <Text style={{ fontWeight: '600' }}>jennichuks9@gmail.com</Text> when there is an answer.
            </Text>
          </Block>
        </TouchableOpacity>
      </ScrollView>

      {/* Ask Button */}
      <Block style={{ position: 'absolute', bottom: insets.bottom + RS(16), left: RS(16), right: RS(16) }}>
        <TouchableOpacity style={styles.button} onPress={submitQuestion}>
          <Text style={styles.buttonText}>Ask the Community</Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default AskQuestionScreen;