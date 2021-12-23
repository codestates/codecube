import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
)

export default Checkbox
