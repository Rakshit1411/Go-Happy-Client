package com.gohappyclient;

import android.app.AlarmManager;
import android.content.Context;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import android.Manifest;
import com.facebook.react.ReactActivity;

//import com.google.firebase.iid.FirebaseInstanceId;
import android.util.Log;
import android.widget.Toast;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.RemoteMessage;
import com.google.android.gms.tasks.OnCompleteListener;

import androidx.annotation.RequiresApi;
import com.google.android.gms.tasks.Task;

import androidx.annotation.NonNull;
//import org.jetbrains.annotations.NotNull;

public class MainActivity extends ReactActivity {

    private static final String TAG = "MainActivity";
    private static final int NOTIFICATION_REQUEST_CODE = 1234;

    @Override
    protected String getMainComponentName() {
        return "GoHappyClient";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            checkAlarmsRemindersPermission();
        }
//        FirebaseMessaging.getInstance().getToken()
//                .addOnCompleteListener(new OnCompleteListener<String>() {
//                    @Override
//                    public void onComplete(@NonNull Task<String> task) {
//                        if (!task.isSuccessful()) {
//                            //System.out.println("Fetching FCM registration token failed");
//
//                            Log.w(TAG, "Fetching FCM registration token failed", task.getException());
//                            return;
//                        }
//
//                        // Get new FCM registration token
//                        String token = task.getResult();
//
//                        // Log and toast
//                        //System.out.println(token);
//                        //Toast.makeText(MainActivity.this, token, Toast.LENGTH_LONG).show();
//                        //etToken.setText(token);
//                        String msg = token;
//                        Log.d(TAG, msg);
//                        Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
//                        //console.log(token);
//                        //Log.d(TAG, msg.getText());
//                    }
//                });
    }

    private boolean checkAlarmsRemindersPermission() {
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        boolean hasPermission = alarmManager.canScheduleExactAlarms();
        if (!hasPermission) {
            showNotificationPermissionDialog();
        }
        return hasPermission;
    }

    private void showNotificationPermissionDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Allow Alarms & Reminders");
        builder.setMessage("Allow GoHappyClub to remind you of ongoing events?");
        builder.setPositiveButton("Allow", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                startActivity(intent);
            }
        });
        builder.create().show();
    }


    public void runtimeEnableAutoInit() {
        // [START fcm_runtime_enable_auto_init]
        FirebaseMessaging.getInstance().setAutoInitEnabled(true);
        // [END fcm_runtime_enable_auto_init]
    }

    private void logRegToken() {
        // [START log_reg_token]
         FirebaseMessaging.getInstance().getToken()
                 .addOnCompleteListener(new OnCompleteListener<String>() {
                     @Override
                     public void onComplete(@NonNull Task<String> task) {
                         if (!task.isSuccessful()) {
                             //System.out.println("Fetching FCM registration token failed");
                            
                             Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                             return;
                         }

                         // Get new FCM registration token
                         String token = task.getResult();

                         // Log and toast
                         //System.out.println(token);
                        // Toast.makeText(MainActivity.this, "Your device token" + token, Toast.LENGTH_SHORT).show();
                         //etToken.setText(token);
                          String msg = "FCM Registration token: " + token;
                          Log.d(TAG, msg);
                         //Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                     }
                 });
        // [END log_reg_token]
    }
}
