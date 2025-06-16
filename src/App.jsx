import { useState, useEffect } from 'react';
import './firebase'; // 실행 목적 (firebase.js에서 실행되는 코드 포함)
import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ComplexMultiVariant from "./start";
import ProfilePage from "./profile";



export default function App() {
  return (
    <Routes>
      <Route path="/test_page" element={<ComplexMultiVariant />} />
      <Route path="/test_page/profile" element={<ProfilePage />} />
    </Routes>
  );
}
