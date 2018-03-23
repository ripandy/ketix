package com.ripandyadha.ketix;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;

public class MainActivity extends Activity {
    public static final String WEB_INTERFACE_CLASS_NAME = "KetixAndroid";

    private WebView mWebView;
    private String gameUrl;

    private void initGame() {
        this.gameUrl = "file:///android_asset/ketix/index.html";
    }

        @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        GameManager.getInstance().setActiveActivity(this);
//
//        int book = GameManager.BOOK_ASAL_MULA_NAMAKU;
//        if (GameManager.getInstance().getActiveBook() != -1) {
//            book = GameManager.getInstance().getActiveBook();
//        }
//
//        initBook(book);
        initGame();

        this.mWebView = (WebView) findViewById(R.id.activity_main_webview);
        this.mWebView.getSettings().setJavaScriptEnabled(true);
        this.mWebView.setWebViewClient(new GameWebViewClient());
        this.mWebView.addJavascriptInterface(new WebAppInterface(this), this.WEB_INTERFACE_CLASS_NAME);
        this.mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

        this.mWebView.clearCache(true);
        this.mWebView.clearHistory();

        this.mWebView.loadUrl(this.gameUrl);

//        GameManager.getInstance().setWebViewActive(true);
    }

    public void reloadPage() {
        this.mWebView.post(new Runnable() {
            public void run() {
//                mWebView.reload();

//        this.mWebView.getSettings().setJavaScriptEnabled(false);
//        this.mWebView.removeJavascriptInterface(GameManager.WEB_INTERFACE_CLASS_NAME);
                mWebView.loadUrl("about:blank");

                mWebView.clearCache(true);
                mWebView.clearHistory();

//        this.mWebView.getSettings().setJavaScriptEnabled(true);
//        this.mWebView.setWebViewClient(new BookReaderWebViewClient());
//        this.mWebView.addJavascriptInterface(new WebAppInterface(this), GameManager.WEB_INTERFACE_CLASS_NAME);
//        this.mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

                mWebView.loadUrl(gameUrl);
            }
        });
    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.finish();
        startActivity(intent);
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            mWebView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
