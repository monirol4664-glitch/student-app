package com.myapp.demo

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    
    private lateinit var textView: TextView
    private lateinit var clickButton: Button
    private var clickCount = 0
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        textView = findViewById(R.id.textView)
        clickButton = findViewById(R.id.clickButton)
        
        clickButton.setOnClickListener {
            clickCount++
            textView.text = "Clicked $clickCount times"
            Toast.makeText(this, "Button clicked!", Toast.LENGTH_SHORT).show()
        }
    }
}
