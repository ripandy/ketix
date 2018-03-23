package com.ripandyadha.ketix;

import android.app.Activity;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by ripandyadha on 23/03/18.
 */
public class WebAppInterface {
    Activity parent;

    /** Instantiate the interface and set the context */
    WebAppInterface(Activity parent) {
        this.parent = parent;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(parent, toast, Toast.LENGTH_SHORT).show();
    }
}
